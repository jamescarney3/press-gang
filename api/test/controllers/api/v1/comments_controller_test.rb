# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CommentsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        sign_in_main_user
        get api_v1_comments_url
        assert_response :success
      end

      test 'should create comment' do
        sign_in_main_user

        post api_v1_comments_url,
             params: {
               comment: {
                 text: 'A generic job application comment',
                 commentable_id: job_applications(:one).id,
                 commentable_type: 'JobApplication'
               }
             }

        assert_response :success
      end

      test 'should destroy comment' do
        comment = Comment.create!(
          user: users(:main),
          commentable: job_applications(:one),
          text: 'A generic job application comment'
        )
        sign_in_main_user

        delete api_v1_comment_url(id: comment.id)

        assert_response :success
      end
    end
  end
end
