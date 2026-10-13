# frozen_string_literal: true

class CompanyPolicy < ApplicationPolicy
  def create?
    true
  end

  def index_scope
    record.where(job_applications: Current.user.job_applications)
  end
end
