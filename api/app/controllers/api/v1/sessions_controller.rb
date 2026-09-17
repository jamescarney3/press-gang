# frozen_string_literal: true

module Api
  module V1
    class SessionsController < Api::V1::ApplicationController
      allow_unauthenticated_access only: %i[create]

      # TODO: rate limit this
      def create
        if (user = User.authenticate_by(params.require(:credentials).permit(:email_address, :password)))
          log_in!(user)
          # TODO: some sort of show view for initial user data might be useful here
          head :ok
        else
          head :unprocessable_entity
        end
      end

      def destroy
        log_out!
        head :ok
      end
    end
  end
end
