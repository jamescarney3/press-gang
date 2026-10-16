# frozen_string_literal: true

module Api
  module V1
    class JobApplicationsController < Api::V1::ApplicationController
      def index
        @job_applications = policy_scope JobApplication.all
        render json: @job_applications
      end

      def show
        @job_application = JobApplication.find(params[:id])

        authorize @job_application

        render json: @job_application.as_json(include: {
          company: { only: [:name, :website_url] }
        }, methods: [:applied_date])
      end

      def create
        @job_application = JobApplication.new(job_application_params)
        @job_application.user = Current.user

        authorize @job_application
        authorize @job_application.company

        @job_application.save!

        render json: @job_application
      end

      def update
        @job_application = JobApplication.find(params[:id])

        authorize @job_application

        @job_application.update(job_application_params);

        render json: @job_application.as_json(include: {
          company: { only: [:name, :website_url] }
        }, methods: [:applied_date])
      end

      private

      def job_application_params
        params.require(:job_application).permit(:role_title, :listing_url, :status, company_attributes: [:name, :website_url])
      end
    end
  end
end
