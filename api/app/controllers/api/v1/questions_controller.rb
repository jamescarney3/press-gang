# frozen_string_literal: true

module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController
      def index
        @questions = policy_scope Question.where(filter_params)

        render json: @questions
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
    end
  end
end
