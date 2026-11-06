# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CompaniesControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        sign_in_main_user
        get api_v1_companies_url
        assert_response :success
      end
    end
  end
end
