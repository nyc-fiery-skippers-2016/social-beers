post '/search' do
  @search_query = params[:search][:query]
  conditions = { term: 'brewery'}

  @results = yelp_client.search(@search_query, conditions).businesses

  if request.xhr?
    content_type :json
    @results.to_json
  end
end

post '/tweets' do
  search_tweets = client.user_search( params[:name] ).first
  @tweet_json = {}
  if search_tweets != nil
    all_tweets = client.user_timeline( search_tweets )
    all_tweets.each_with_index do | tweet, idx |
      @tweet_json["tweet#{idx + 1}"] = tweet.text
      break if idx == 4
    end
    if request.xhr?
      content_type :json
      @tweet_json.to_json
    end
  end
end
