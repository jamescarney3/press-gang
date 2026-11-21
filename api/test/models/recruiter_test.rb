# frozen_string_literal: true

require 'test_helper'

class RecruiterTest < ActiveSupport::TestCase
  test 'downcases and strips email_address' do
    recruiter = Recruiter.new(email_address: ' DOWNCASED@EXAMPLE.COM ')
    assert_equal('downcased@example.com', recruiter.email_address)
  end
end
