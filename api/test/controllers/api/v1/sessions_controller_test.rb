require 'test_helper'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup { @user = User.take }

  test 'create with valid credentials' do
    post api_v1_session_path, params: { email_address: @user.email_address, password: 'password' }

    assert_response :success
    assert cookies[:session_token]
  end

  test 'create with invalid credentials' do
    post api_v1_session_path, params: { email_address: @user.email_address, password: 'wrong' }

    assert_response :unprocessable_entity
    assert_nil cookies[:session_token]
  end

  test 'destroy' do
    sign_in_as(@user)

    delete api_v1_session_path

    assert_response :success
    assert_empty cookies[:session_token]
  end

  # TODO: should this be a more generic helper? need to understand more about test helpers
  def sign_in_as(user)
    Current.session = user.sessions.create!

    # TODO: find out more about how this works!
    ActionDispatch::TestRequest.create.cookie_jar.tap do |cookie_jar|
      cookie_jar.signed.permanent[:session_token] = Current.session.session_token
      cookies[:session_token] = cookie_jar[:session_token]
    end
  end
end
