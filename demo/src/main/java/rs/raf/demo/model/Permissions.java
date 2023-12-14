package rs.raf.demo.model;

import java.util.HashMap;
import java.util.Map;

public class Permissions {
    public enum Permission {
        can_create_users, can_read_users, can_update_users, can_delete_users
    }

    public static final Map<Integer, Permission> intToPermission = new HashMap<>();
    public static final Map<Permission, Integer> permissionToInt = new HashMap<>();

    static {
        int curr = 1;
        for (Permission p : Permission.values()) {
            intToPermission.put(curr, p);
            permissionToInt.put(p, curr);
            curr <<= 1;
        }
    }
}
