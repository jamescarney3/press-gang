class Api::V1::ApplicationController < ActionController::Base
  include ApiAuthentication
  # include AccessControl

  def api_root
    render plain: "press gang api"
  end
end
