# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

if Rails.env.development?
  # some users
  ned = User.find_or_create_by(email_address: 'ned.ludd@gmail.com') do |u|
    u.password = 'ned$pass'
    u.first_name = 'Ned'
    u.last_name = 'Ludd'
  end

  artemis = User.find_or_create_by(email_address: 'artemis.cat@gmail.com') do |u|
    u.password = 'cat_stick!'
    u.first_name = 'Artemis'
    u.last_name = 'Cat'
  end

  freyja = User.find_or_create_by(email_address: 'freyja.cat@gmail.com') do |u|
    u.password = 'crunchies$$$'
    u.first_name = 'Freyja'
    u.last_name = 'Cat'
  end

  users = [ned, artemis, freyja]

  # some companies
  foocorp = Company.find_or_create_by(name: 'Foo Corp, Inc.') do |c|
    c.website_url = 'http://www.foocorp.com'
  end

  barcorp = Company.find_or_create_by(name: 'Bar Corp, Ltd.') do |c|
    c.website_url = 'http://www.barcorp.com'
  end

  bazly = Company.find_or_create_by(name: 'Bazly ') do |c|
    c.website_url = 'http://www.bazly.com'
  end

  companies = [foocorp, barcorp, bazly]

  # some job applications
  titles = [
    'Cruft Eliminator',
    'Yak Shaver',
    'Toil Reducer',
    'JSON Response Composer',
    'Regex Matcher',
    'Scrum Overlord',
    'Email Deleter',
    'Bike Shed Architect',
    'Holodeck Janitor'
  ]

  users.each do |u|
    companies.each do |c|
      JobApplication.find_or_create_by(user: u, company: c) do |ja|
        ja.role_title = titles.shift
        ja.listing_url = c.website_url + '/jobs/' + ja.role_title.gsub(/\s+/, "")
      end
    end
  end
end
