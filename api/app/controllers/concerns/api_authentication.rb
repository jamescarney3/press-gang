# frozen_string_literal: true

module ApiAuthentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  private
  def find_session
    session = Session.find_by(session_token: cookies.signed.permanent[:session_token]) if cookies.signed.permanent[:session_token]
    Current.session ||= session
  end

  def authenticated?
    !!find_session
  end

  def require_authentication

    head :unprocessable_entity unless find_session
  end

  def log_in!(user)
    user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |session|
      cookies.signed.permanent[:session_token] = session.session_token
      Current.session = session
    end
  end

  def log_out!
    Current.session.destroy
    cookies.delete(:session_token)
  end
end
