# frozen_string_literal: true

require 'test_helper'

require_relative '../../concerns/access_control_test'

module Api
  module V1
    class QuestionsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        sign_in_main_user
        get api_v1_questions_url
        assert_response :success
      end

      test 'should create comment' do
        users(:main)
        job_application = job_applications(:one)
        prompt = 'a generic job application question prompt'
        answer = 'a generic job application question answer'
        # question = Question.create(user: user, job_application: job_application, prompt: prompt, answer: answer)

        sign_in_main_user

        post api_v1_questions_url,
             params: { question: { job_application_id: job_application.id, prompt: prompt, answer: answer } }
        assert_response :success
      end

      test 'should destroy comment' do
        user = users(:main)
        job_application = job_applications(:one)
        prompt = 'a generic job application question prompt'
        answer = 'a generic job application question answer'
        question = Question.create(user: user, job_application: job_application, prompt: prompt, answer: answer)

        sign_in_main_user

        delete api_v1_question_url(id: question.id)
        assert_response :success
      end
    end
  end
end
