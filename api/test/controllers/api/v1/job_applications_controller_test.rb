# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class JobApplicationsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        sign_in_main_user
        get api_v1_job_applications_url
        assert_response :success
      end

      test 'should create job application' do
        sign_in_main_user

        post api_v1_job_applications_url,
             params: {
               job_application: {
                 role_title: 'Software Engineer',
                 listing_url: 'https://example.com/jobs/software-engineer',
                 company_attributes: {
                   name: 'Example Corp',
                   website_url: 'https://example.com'
                 }
               }
             }

        assert_response :success
      end

      test 'should update job application' do
        sign_in_main_user

        patch api_v1_job_application_url(id: job_applications(:one).id),
              params: { job_application: { role_title: 'Senior Yak Shaver' } }

        assert_response :success
      end
    end
  end
end
