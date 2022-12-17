import React, {useState} from 'react';
import Modal from "./Modal";

const ModalInfo = ({modalActive, setModalActive}) => {
    const [modalRules, setModalRules] = useState(false);
    const [modalApplication, setModalApplication] = useState(false);
    const [modalDevelopers, setModalDevelopers] = useState(false);

    function getRules() {
        setModalActive(false)
        setModalRules(true)
    }

    function getApplication() {
        setModalActive(false)
        setModalApplication(true)
    }

    function getDevelopers() {
        setModalActive(false)
        setModalDevelopers(true)
    }

    return (
        <div>
            <Modal active={modalActive} setActive={setModalActive} style={'modal_info_content'}>
                <h1 style={{fontSize: "20px", display: "flex"}}>Справочная информация</h1>
                <button className='modal__info__button' onClick={() => getRules()}>Правила</button>
                <button className='modal__info__button' onClick={() => getApplication()}>О приложении</button>
                <button className='modal__info__button' onClick={() => getDevelopers()}>О разработчиках</button>
            </Modal>
            <Modal active={modalRules} setActive={setModalRules} style={'modal_info_content_rules'}>
                <h1 style={{fontSize: "20px", display: "flex", flexDirection: "column",
                    alignItems: "center"}}>Правила</h1>
                Морской бой - игра для двух участников, в которой игроки по очереди
                атакуют корабли, находящиеся на поле соперника. Если у соперника по
                указанным координатам имеется корабль, то корабль или его часть «топится»,
                а попавший получает право сделать ещё один ход.
                <br/>
                Цель игрока - первым поразить все корабли противника.
                <br/>
                На ход игроку дается N сек игрового времени, после истечения времени игрок
                пропускает свой ход. После Х пропусков хода игроку присуждается
                поражение.
                <br/>
                Расстановка кораблей.
                <br/>
                Для начала игры нужно расставить все корабли на поле. При размещении
                корабли не могут касаться друг друга сторонами и углами.
                Всего 10 кораблей: 4 однопалубных, 3 двухпалубных, 2 трёхпалубных и 1
                однопалубный.
            </Modal>
            <Modal active={modalApplication} setActive={setModalApplication} style={'modal_info_content_application'}>
                <h1 style={{fontSize: "20px", display: "flex", flexDirection: "column",
                    alignItems: "center"}}>О приложении</h1>
                Автоматизированная система «Игра «Морской бой».
                <br/>
                Система предназначена для игры по онлайну в классический
                морской бой между двумя людьми или между компьютером и
                человеком.
                <br/>
                Дополнительные возможности системы:
                <br/>
                - автоматическая расстановка кораблей:
                <br/>
                <ul style={{marginLeft: "25px"}}>
                    <li>случайная;</li>
                    <li>по стратегии половина поля;</li>
                    <li>по стратегии берега;</li>
                </ul>
                - стратегия стрельбы:
                <br/>
                <ul style={{marginLeft: "25px"}}>
                    <li>диагонали;</li>
                    <li>шахматы;</li>
                    <li>локатор;</li>
                </ul>
                - сохранение расстановки;
                <br/>
                - загрузка расстановки;
                <br/>
                - просмотр истории игр.
            </Modal>
            <Modal active={modalDevelopers} setActive={setModalDevelopers} style={'modal_info_content'}>
                <h1 style={{fontSize: "20px", display: "flex", flexDirection: "column",
                    alignItems: "center"}}>О раработчиках</h1>
                Лабораторный практикум по дисциплине:
                <br/> <div style={{display: "flex", flexDirection: "column",
                    alignItems: "center"}}>«Технологии программирования»</div>
                Тема: «Автоматизированная система «Игра «Морской бой»
                <br/>Разработчики:
                <ul style={{marginLeft: "25px"}}>
                    <li>Савинов Дмитрий</li>
                    <li>Чернышев Александр</li>
                    <li>Поляков Сергей</li>
                </ul>
                Группа: 6404 - 090301D
                <br/>Руководитель: Зеленко Лариса Сергеевна
                <br/> <div style={{display: "flex", flexDirection: "column",
                alignItems: "center"}}>Самарский университет 2022</div>
            </Modal>
        </div>
    );
};

export default ModalInfo;