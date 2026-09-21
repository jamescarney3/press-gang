# frozen_string_literal: true

module Api
  module V1
    class JobApplicationsController < Api::V1::ApplicationController
      def index
        @job_applications = policy_scope JobApplication.all
        render json: @job_applications
      end
    end
  end
end
