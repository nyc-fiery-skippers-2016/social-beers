helpers do
  def yelp_client
    Yelp::Client.new({ consumer_key: ENV["CONSUMER_KEY"],
                       consumer_secret: ENV["CONSUMER_SECRET"],
                       token: ENV["TOKEN"],
                       token_secret: ENV["TOKEN_SECRET"]
                    })
  end
end
