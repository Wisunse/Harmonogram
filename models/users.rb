class Users

  def self.all_users
    sql = {statement: 'SELECT id, login FROM accounts', values: []}
    result = Tools.sql_query(sql)

    { all_users: result.to_a }
  end


end