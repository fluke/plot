class StageSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :imgurl, :user_id
end
