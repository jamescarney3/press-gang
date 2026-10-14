# frozen_string_literal: true

class JobApplicationPolicy < ApplicationPolicy
  def create?
    true
  end

  def show?
    record.user == user
  end

  def index_scope
    record.where(user: Current.user)
  end
end
