class Authentication

  def self.authentication(params = {})


    if !params[:login].nil? && !params[:password].nil?

      sql = 'SELECT '
      ldap = Connector::Ldap.new(:login => params[:login],
                                 :password => params[:password])
      if ldap.authentication
        authenticated_ppl(ldap.data)
      else
        '-2' # wrong login/pass
      end
    else
      '-1' # nil in login/pass
    end

  end

end