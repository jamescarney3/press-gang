# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class JobApplicationsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        sign_in_main_user
        get api_v1_job_applications_index_url
        assert_response :success
      end
    end
  end
end
