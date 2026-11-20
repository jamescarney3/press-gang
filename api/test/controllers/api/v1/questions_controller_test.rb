# frozen_string_literal: true

require 'test_helper'

require_relative '../../concerns/access_control_test'

module Api
  module V1
    class QuestionsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        own_question = Question.create!(user: users(:main), job_application: job_applications(:one),
                                        prompt: 'A question for the current user')
        Question.create!(user: users(:one), job_application: job_applications(:one),
                         prompt: 'A question for another user')

        sign_in_main_user
        get api_v1_questions_url
        assert_response :success
        assert_equal [own_question.id], response.parsed_body.pluck('id')
      end

      test 'should search questions by prompt and answer' do
        job_application = job_applications(:one)
        prompt_match = Question.create!(user: users(:main), job_application: job_application,
                                        prompt: 'Ruby application architecture')
        answer_match = Question.create!(user: users(:main), job_application: job_application,
                                        answer: 'Experienced with distributed tracing')
        Question.create!(user: users(:main), job_application: job_application,
                         prompt: 'Designing an API', answer: 'No matching terms')

        sign_in_main_user

        get api_v1_questions_url, params: { search: 'distributed' }
        assert_response :success
        assert_equal [answer_match.id], response.parsed_body.pluck('id')

        get api_v1_questions_url, params: { search: 'Ruby' }
        assert_response :success
        assert_equal [prompt_match.id], response.parsed_body.pluck('id')
      end

      test 'should combine search with job application filter and user scope' do
        matching_question = Question.create!(user: users(:main), job_application: job_applications(:one),
                                             prompt: 'Tell me about Ruby')
        Question.create!(user: users(:main), job_application: job_applications(:two),
                         prompt: 'Tell me about Ruby')
        Question.create!(user: users(:one), job_application: job_applications(:one),
                         prompt: 'Tell me about Ruby')

        sign_in_main_user

        get api_v1_questions_url, params: { search: 'Ruby', job_application_id: job_applications(:one).id }
        assert_response :success
        assert_equal [matching_question.id], response.parsed_body.pluck('id')
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
