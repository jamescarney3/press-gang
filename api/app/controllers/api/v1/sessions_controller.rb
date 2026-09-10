class Api::V1::SessionsController < Api::V1::ApplicationController
  skip_before_action :verify_authenticity_token
  allow_unauthenticated_access only: %i[ create ]

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
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
