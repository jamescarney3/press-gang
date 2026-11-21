# frozen_string_literal: true

module Api
  module V1
    class RecruitersController < Api::V1::ApplicationController
      def index
        @recruiters = policy_scope Recruiter.all
        @recruiters = @recruiters.includes(fk_associations).where(fk_filters) if fk_filter_params.present?
        @recruiters = @recruiters.search_by_prompt_and_answer(search_param) if search_param.present?

        render :index
      end

      def create
        @recruiter = Recruiter.new(recruiter_params)

        authorize @recruiter
        @recruiter.save!

        render :show
      end

      def show
        @recruiter = Recruiter.find(params[:id])

        authorize @recruiter

        render :show
      end

      private

      # POST, PUT, PATCH
      def recruiter_params
        params.require(:recruiter).permit(:email_address, :first_name, :last_name, :linked_in_url, :phone_number)
      end

      # GET
      def filter_params
        params.slice(:job_application_id).permit(:job_application_id)
      end

      # GET
      def search_param
        params.slice(:search).permit(:search)[:search]
      end

      # TODO: fk_* methods seem to be asking to be put into a reusable concern somewhere, which
      # may not necessarily be at the controller layer even though this was the easiest place to
      # think through the initial logic. figure out where that is and implement...
      def fk_filter_params
        params.slice(:job_application_id).permit(:job_application_id)
      end

      def fk_associations
        fk_filter_params.keys.map { |k| (k.delete_suffix '_id').pluralize }
      end

      def fk_filters
        ActionController::Parameters.new.tap do |p|
          fk_filter_params.each do |k, v|
            association = (k.delete_suffix '_id').pluralize
            p[association] = { id: v }
          end
        end.permit!
      end
    end
  end
end
