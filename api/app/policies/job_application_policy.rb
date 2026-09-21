class JobApplicationPolicy < ApplicationPolicy
  def index_scope
    record.where(user: Current.user)
  end
end
