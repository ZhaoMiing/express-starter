(function($) {
    $(function () {
        function renderUser () {
            $.getJSON('/users/userlist', function (data) {
                console.log(data);
                var trs = '';   

                $.each(data, function (i, item) {
                    trs = trs + '<tr><td>' + 
                    item.username +
                    '</td><td>' +
                    item.email +
                    '</td><td><a href="javascript:void(0);" class="delete-item" rel="'+item._id+'">X</a></td></tr>';
                });

                $('#userList').find('tbody').html(trs);
            });
        }

        renderUser();

        $(document).on('click', '#btnAddUser', function (e) {
            e.preventDefault();
            addUser();
        });

        function addUser() {
            var newUser = {};
            var $ipt = $('#addUserForm').find('input');

            $ipt.each(function () {
                newUser[$(this).attr('name')] = $(this).val();
            });

            $.ajax({
                type : 'POST',
                url : '/users/adduser',
                data : newUser,
                dataType : 'JSON'
            }).done(function (data) {
                if(data.msg == '') {
                    $ipt.each(function (){
                        this.value = '';
                    });
                    renderUser();
                }
            });
        }

        function deleteItem(el) {
            var userToDelete = $(el).attr('rel');

            $.ajax({
                type : 'DELETE',
                url : 'users/delete/' + userToDelete
            }).done(function (data) {
                console.log(data);
                if(data.msg == ''){
                    $(el).closest('tr').remove();
                }else{
                    alert('Error: ' + data.msg);
                }
            })
        }

        $(document).on('click', '.delete-item', function (e) {
            e.preventDefault();
            deleteItem.call(null, this);
        });
    });
}(jQuery));