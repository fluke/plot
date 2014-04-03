class Project < ActiveRecord::Base
	has_many :stages, :dependent => :destroy
end
