# frozen_string_literal: true

module Api
  module V1
    class CommentsController < Api::V1::ApplicationController
      def index
        @comments = policy_scope Comment.where(filter_params)

        render json: @comments
      end

      def create
        @comment = Comment.new(comment_params)
        @comment.user = Current.user

        authorize @comment
        @comment.save!

        render json: @comment
      end

      def destroy
        @comment = Comment.find(params[:id])

        authorize @comment
        @comment.destroy!

        head :no_content
      end

      private

      def comment_params
        params.require(:comment).permit(:text, :commentable_id, :commentable_type)
      end

      def filter_params
        params.permit(:commentable_id, :commentable_type)
      end
    end
  end
end
