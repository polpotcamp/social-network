import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostItem from "./PostItem";
describe('PostItemTests', () => {
    it('PostItemEmptyTest', () => {
        render(<BrowserRouter><PostItem post={null} /></BrowserRouter>)
        const buttonElement =  screen.getByText('Загрузка...')
        expect(buttonElement).toMatchSnapshot()
    })
})