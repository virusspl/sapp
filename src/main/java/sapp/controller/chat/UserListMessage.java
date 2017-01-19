package sapp.controller.chat;

import java.io.Serializable;
import java.util.ArrayList;

public class UserListMessage implements Serializable{

	private static final long serialVersionUID = 6141348167516372321L;
	ArrayList<String> users;

	public UserListMessage() {
		users = new ArrayList<>();
	}

	public UserListMessage(ArrayList<String> users) {
		this.users = users;
	}

	/**
	 * @return the users
	 */
	public ArrayList<String> getUsers() {
		return users;
	}

	/**
	 * @param users the users to set
	 */
	public void setUsers(ArrayList<String> users) {
		this.users = users;
	}
	
	
	
}
