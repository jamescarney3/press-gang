# frozen_string_literal: true

class Recruiter < ApplicationRecord
  has_many :comments
  has_many :job_applications

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
