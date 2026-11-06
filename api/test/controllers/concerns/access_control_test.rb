# frozen_string_literal: true

require 'test_helper'
require 'minitest/mock'

class AccessControlTestController
  include AccessControl

  def initialize(record: nil, records: nil, action: nil)
    @record = record
    @records = records
    @action = action
  end

  attr_accessor :record, :records, :action

  def create
    authorize(@record)
  end

  def destroy
    authorize(@record)
  end

  def index
    policy_scope(@records)
  end

  def params
    ActionController::Parameters.new(action: action)
  end
end

class AccessControlTestPolicy < ApplicationPolicy
  def create?
    true
  end

  def destroy?
    false
  end

  def index_scope
    record
  end
end

class AccessControlTest < ActiveSupport::TestCase
  def setup
    @user = Object.new
    @record = Struct.new(:authorized).new(true)
    @records = Object.new
  end

  test 'authorize calls the current action policy with the current user and record' do
    with_controller('create', record: @record) do |controller|
      assert_nothing_raised { controller.create }
    end
  end

  test 'authorize raises when the current action policy denies access' do
    with_controller('destroy', record: @record) do |controller|
      assert_raises(AccessControl::NotAuthorizedError) { controller.destroy }
    end
  end

  test 'policy_scope returns the current action policy scope for the records' do
    with_controller('index', records: @records) do |controller|
      assert_same controller.index, @records
    end
  end

  private

  def with_controller(action, record: @record, records: @records)
    controller = AccessControlTestController.new(record:, records:, action:)
    Current.stub(:user, @user) { yield controller }
  end
end
