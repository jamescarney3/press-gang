# frozen_string_literal: true

ApplicationPolicy = Struct.new(:user, :record) do
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end
end
