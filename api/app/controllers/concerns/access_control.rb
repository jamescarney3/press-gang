# frozen_string_literal: true

module AccessControl
  extend ActiveSupport::Concern

  class NotAuthorizedError < StandardError; end

  CONTROLLER_SUFFIX = 'Controller'
  POLICY_SUFFIX = 'Policy'

  included do
    def authorize(record)
      raise NotAuthorizedError unless policy_class.new(Current.user, record).public_send(policy_action)
    end

    def policy_scope(records)
      policy_class.new(Current.user, records).public_send(scope_action)
    end
  end

  private
    def policy_class
      "#{self.class}".gsub(CONTROLLER_SUFFIX, POLICY_SUFFIX).constantize
    end

    def policy_action
      "#{params[:action]}?"
    end

    def scope_action
      "#{params[:action]}_scope"
    end
end
