module.exports = {
    account: 'Account',
    account_management: 'Account Management',
    add: 'Add',
    add_user: 'Add User',
    add_user_data_sync_platform: 'Add User Data Sync Platform',
    associated_account: 'Associated Account‘s Number',
    auto_sync_time: 'Auto Time Sync',
    cancel: 'Cancel',
    change_password: 'Change Password',
    class_room: 'Tertiary Department',
    clear_all_account: 'Clear All Account',
    close: 'Close',
    colleges_department: 'Department',
    comprehensive_setting: 'Comprehensive Setting',
    confirm_password: 'Confirm Password',
    current_server_version: 'Current Server Version',
    del: 'Delete',
    department: 'Department',
    department_specialty_grade_class_room: 'Department/Primary Department/Secondary Department/Tertiary Department',
    description: 'Description',
    details: 'Details',
    domain: 'Domain User',
    domain_account: 'Domain Account',
    domain_admin: 'Domain Admin',
    domain_controller: 'Domain Controller',
    domain_manager: 'Domain Manager',
    domain_platform: 'Domain Platform',
    domain_server: 'Domain Server',
    domain_user: 'Domain User',
    domain_platform_protocol_type: 'Domain Platform Protocol Type',
    upload_the_certificate_file: 'Certificate File',
    new_user_data_synchronization_platform: 'New User Data Synchronization Platform',
    edit_the_user_data_synchronization_platform: 'Edit The User Data Synchronization Platform',
    tel: 'Telephone',
    email: 'Email',
    expiration_time: 'Expiration Time',
    user_desc: 'User Description',
    imported_user: 'Imported User',
    imported_user_cover: 'Continue importing overwrite already imported users',
    imported_user_ignore: 'Ignore this user do not overwrite already imported users',
    edit: 'Edit',
    edit_user: 'Edit User',
    edit_user_data_sync_platform: 'Edit user data synchronization platform',
    error: 'Error',
    every_day: 'Every Day',
    every_hour: 'Every Hour',
    female: 'Female',
    file_format_err: 'File format is incorrect please select.xlsx file',
    face_id_server_settings:'Face Recognition Authentication Server Settings',
    full_name: 'Full Name',
    gender: 'Gender',
    general_user: 'General User',
    grade: 'Secondary Department',
    phone_number: 'Phone Number',
    import: 'Import',
    import_tip: 'Import Tip',
    import_tip_content: '<ol><li> Please use EXCEL to edit the sample file format. </li><li> If the account is repeated the current imported information will be used to overwrite the account. </li><li> Do not refresh the browser or close the window during the upload. Otherwise the file upload will stop. </li></ol>',
    import_tip_content_2: 'Click to select or drag file to start uploading *.xlsx only',
    import_tpl_download: 'Download Template File',
    import_users: 'Import Users',
    info: 'Information',
    ip_address: 'Ip Address',
    login: 'Login',
    login_title: 'User Login',
    logout: 'Logout',
    male: 'Male',
    mobile: 'Telephone Number',
    ok: 'OK',
    old_password: 'Old Password',
    open: 'Open',
    operation: 'Operation',
    other_platform: 'Other Platform',
    password: 'Password',
    platform_name: 'Platform Name',
    platform_setting: 'Platform Setting',
    platform_type: 'Platform Type',
    please_enter_a_valid_port_number: 'Please enter a valid port number',
    port: 'Port',
    product_name: 'Os-easy user Account and authentication platform',
    search: 'Search',
    search_tip: 'Search ...',
    specialty: 'Primary Department',
    specialty_grade_class_room: 'Primary Department/Secondary Department/Tertiary Department',
    start_update: 'Start Update',
    server_ip:'Server Ip',
    student: 'Student',
    success: 'Success',
    sync: 'Synchronization',
    sync_fail: 'Synchronization Failure',
    sync_log: 'Synchronization Log',
    sync_now: 'Manual Synchronization',
    sync_result: 'Synchronization Result',
    sync_setting: 'Synchronization Setting',
    sync_success: 'Synchronization Success',
    sync_time: 'Synchronization Time',
    sync_time_setting: 'Timed Synchronization Settings',
    system_upgrade: 'System Upgrade',
    teacher: 'Teacher',
    timing_sync: 'Timed Synchronization',
    type: 'Type',
    update_server_tip_content_2: 'Click to select or drag file to start uploading *.bin only',
    upgrade_package_version: 'Upgrade Package Version',
    upload_bin_file: 'Select file (.bin)',
    upload_file: 'Upload File',
    user_type: 'User Type',
    username: 'User Name',
    warning: 'Warning',
    loading: 'Loading',
    import_attr_match: 'Import Attribute Match',
    import_attr_match_tips: 'Used for one-to-one correspondence between the domain controller and the user information field of this platform. The default corresponding field is set in the lower part according to common domain controller fields you can modify it as required',
    'access_platform_deleted_click_ok_continue{0}': '<span> The following platform links will be deleted delete the corresponding synchronized user click OK to continue. </span><br>{0}',
    'accounts_deleted_click_ok_continue{0}': 'To delete the following account click OK to proceed. <br>{0}',
    'accounts_deleted_all_click_ok_continue': '<span class="text-danger">To delete all accounts click OK to continue.</span>',
    'file_{0}format_{1}size_err': 'File format or file size does not meet requirements please select {0} file file max {1}MB',
    errorCode: {
        1: 'Parameter error',
        2: 'Database operation failed',
        100000: 'User server platform does not exist',
        100001: 'User Service platform request authentication failed',
        100002: 'User service platform validation returns an error parameter',
        100003: 'User does not exist',
        100004: 'User already exists',
        100005: 'Incorrect password',
        100006: 'Non-admin users are not allowed to log in',
        100007: 'Failed to open file',
        100008: 'File format is incorrect',
        100009: 'Old password error',
        100010: 'Failed to save upgrade file',
        100011: 'Upgrade package version is later than installation version',
        100100: 'The same platform name already exists',
        100101: 'Edit server does not exist',
        100102: 'Only one third-party user platform link is allowed to be added. If you want to add it again please delete it and add it again!!',
        100103: 'Administrator account not compliant',
        100104: 'Failed to connect to user data synchronization platform',
        100105: 'Domain platform name error',
        100106: 'Synchronization failed',
        100107: 'Third-party user platform connection exception',
        100207: 'Abnormal face service'
    },
    validate: {
        '{min}_{max}_length': 'between {min}-{max}',
        'required_{min}_{max}_length': 'Between {min} and {max}',
        'required_{min}_{max}_num_range': 'This is mandatory and ranges from {min} to {max}',
        'phone_number_incorrect': 'Incorrect format of phone number',
        'ip_incorrect': 'Ip incorrect',
        required: 'Required',
        compare_required: 'Specify the target git a field using the compare property',
        'two_passwords_not_match': 'Two passwords not to match',
        'alphanumeric_characters_underscores': 'Only numbers letters underscores can be used'
    },
    oem: {
        login_footer: 'Copyright© OS-easy Group Holding Ltd.',
        page_title: 'Os-easy user Authentication account and authentication platform'
    }
};
