package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
)

func parse(r io.Reader) error {
	fmt.Printf("%+v", r)
	buffer := new(bytes.Buffer)
	_, err := buffer.ReadFrom(r)
	if err != nil {
		return err
	}
	fmt.Println(string(buffer.Next(8)))
	if string(buffer.Next(8)) != "\x89PNG\r\n\x1a\n" {
		return fmt.Errorf("not a PNG")
	}

	return nil
}

func main() {
	imageFile := "sub.png"
	file, err := os.Open(imageFile)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%+v", file)
	defer file.Close()

	err = parse(file)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Complete")
}
