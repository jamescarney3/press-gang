# frozen_string_literal: true

class RecruiterPolicy < ApplicationPolicy
  def create?
    true
  end

  def show?
    true
  end

  def index_scope
    record
  end
end
