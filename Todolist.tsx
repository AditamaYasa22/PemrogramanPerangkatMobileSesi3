import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<{ id: number; title: string; completed: boolean }[]>([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState<number | null>(null); 
  const [editTitle, setEditTitle] = useState<string>(''); 

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }
    const newTodo = {
      id: todo.length + 1,
      title: title,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setTitle('');
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are You Sure You Want to Delete This Todo?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {

    const updatedTodos = todo.filter((item) => item.id !== id);
    setTodo(updatedTodos);
          }
        }
      ]
    );
  };

  const handleEditTodo = (id: number) => {
    const updatedTodos = todo.map((item) =>
      item.id === id ? { ...item, title: editTitle } : item
    );
    setTodo(updatedTodos);
    setIsEditing(null); // Exit edit mode
    setEditTitle('');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Enter your Todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}
        >
          <Text
            style={{
              color: 'white',
            }}
          >
            Add Todo
          </Text>
        </Pressable>
      </View>

      {todo.map((item) =>
        isEditing === item.id ? (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                padding: 10,
              }}
            />
            <Pressable
              onPress={() => handleEditTodo(item.id)}
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'black',
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setIsEditing(item.id);
                  setEditTitle(item.title); // Set current todo title to edit
                }}
                style={{
                  backgroundColor: 'orange',
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  Edit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleDeleteTodo(item.id)}
                style={{
                  backgroundColor: 'red',
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default TodoList;
