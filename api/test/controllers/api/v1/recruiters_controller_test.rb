# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class RecruitersControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        test_recruiter = Recruiter.create(first_name: 'Bartleby')

        sign_in_main_user
        get api_v1_recruiters_url
        assert_response :success
        assert_includes response.parsed_body.pluck('id'), test_recruiter.id
      end

      test 'should get show' do
        test_recruiter = Recruiter.first

        sign_in_main_user
        get api_v1_recruiter_url(id: test_recruiter.id)

        assert_response :success
        assert_equal response.parsed_body['id'], test_recruiter.id
      end

      test 'should post create' do
        sign_in_main_user
        post api_v1_recruiters_url,
             params: { recruiter: { first_name: 'Honk',
                                    last_name: 'Zonkerbonk',
                                    email_address: 'honk.zonkerberg@gmail.com',
                                    linked_in_url: 'http://tinyurl.com/123456',
                                    phone_number: '1-(234)-456-7890' } }

        assert_response :success
        assert_equal response.parsed_body['firstName'], 'Honk'
        assert Recruiter.find_by(first_name: 'Honk', last_name: 'Zonkerbonk').present?
      end
    end
  end
end
