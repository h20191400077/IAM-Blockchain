pragma solidity 0.7.0;
contract BITS {

	struct user {
		uint id;
		string userid;
		string password;
	}

	

	mapping(uint => user) public users;
	
	uint public user_count = 0;

	
	event userCreated(
		uint id,
		string userid,
		string password
		
	);
	
	constructor() public {
		add_user("Faculty", "qwertyui");
		
	}

	function add_user(string memory _userid, string memory _password) public {
		user_count++;
		users[user_count] = Faculty(user_count, _userid, _password);
		emit userCreated(user_count, _userid, _password);
	}	
}