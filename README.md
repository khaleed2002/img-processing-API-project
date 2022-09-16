
# Image processing API
A project to resize images using Sharp API


## API Reference

#### Get all items

```http
  GET /resize
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filename` | `string` | **Required**. image file name |
| `width` | `number` | **Required**. new width |
| `height` | `number` | **Required**. new height |

#### new image example

```http
  GET /resize?filename=fjord&width=300&height=700
```
## Functions used in project
#### fileExist ( path :string )

Takes a path for file and return one of these values:
```http
  true: when file is exist
```
```http
  false: when file is not exist
```

#### resizeImg( source :string, width :number, height :number)

Takes path, width and height for original image and return
and return a path for new resized image.
