user = User.find_or_create_by!(email: "dev@example.com") do |u|
  u.password = "password"
  u.password_confirmation = "password"
  u.username = "dev_user"
end

tag1 = Tag.find_or_create_by!(slug: "button") do |t|
  t.name = "Button"
end

tag2 = Tag.find_or_create_by!(slug: "card") do |t|
  t.name = "Card"
end

item = Item.find_or_create_by!(title: "サンプルカード", user: user) do |i|
  i.description = "開発確認用の仮データ"
  i.html = '<div class="card">Hello</div>'
  i.css = '.card { padding: 24px; background: #f5f5f5; border-radius: 12px; }'
  i.status = :published
end

item.tags = [tag1, tag2]
