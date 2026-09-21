class Api::V1::JobApplicationsController < Api::V1::ApplicationController
  def index
    @job_applications = policy_scope JobApplication.all
    render json: @job_applications
  end
end
