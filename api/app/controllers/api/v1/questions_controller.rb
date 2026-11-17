# frozen_string_literal: true

module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController
      def index
        @questions = policy_scope Question.where(filter_params)
        @questions = @questions.search_by_prompt_and_answer(search_param) if search_param.present?

        render :index
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

      # POST, PUT, PATCH
      def question_params
        params.require(:question).permit(:answer, :prompt, :job_application_id)
      end

      # GET
      def filter_params
        filter_keys = [:job_application_id]
        params.slice(*filter_keys).permit(*filter_keys)
      end

      # GET
      def search_param
        params.slice(:search).permit(:search)[:search]
      end
    end
  end
end
