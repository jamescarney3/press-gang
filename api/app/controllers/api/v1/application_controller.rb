# frozen_string_literal: true

module Api
  module V1
    class ApplicationController < ActionController::Base
      include ApiAuthentication
      # include AccessControl

      skip_before_action :verify_authenticity_token

      def api_root
        render plain: 'press gang api'
      end
    end
  end
end
