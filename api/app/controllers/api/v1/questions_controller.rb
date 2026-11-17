# frozen_string_literal: true

module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController
      def index
        @questions = policy_scope Question.where(filter_params)
        @questions = @questions.search_by_prompt_and_answer(search_param) if search_param.present?

        render json: @questions.as_json(only: %i[prompt answer],
                                        include: {
                                          job_application: { only: %i[role_title],
                                                             include: { company: { only: %i[name] } } }
                                        })
      end

      def create
        @question = Question.new(question_params)
        @question.user = Current.user

        authorize @question
        @question.save!

        render json: @question
      end

      def destroy
        @question = Question.find(params[:id])

        authorize @question
        @question.destroy!

        head :no_content
      end

      private

      def question_params
        params.require(:question).permit(:answer, :prompt, :job_application_id)
      end

      def filter_params
        params.permit(:job_application_id)
      end

      def search_param
        params.permit(:search)[:search]
      end
    end
  end
end
