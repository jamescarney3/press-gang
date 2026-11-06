# frozen_string_literal: true

class Question < ApplicationRecord
  include DateFormattable

  belongs_to :user
  belongs_to :job_application
end
