# frozen_string_literal: true

class CommentPolicy < ApplicationPolicy
  def create?
    true
  end

  def destroy?
    record.user == user
  end

  def index_scope
    record.where(user: user)
  end
end
