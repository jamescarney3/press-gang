# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < Api::V1::ApplicationController
      def index
        @companies = policy_scope Company.all
        render json: @companies
      end
    end
  end
end
