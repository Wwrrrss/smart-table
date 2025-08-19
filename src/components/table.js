import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    before.reverse().forEach(template => {
        root[template] = cloneTemplate(template);
        root.container.prepend(root[template].container);
    })

    after.forEach(template => {
        root[template] = cloneTemplate(template);
        root.container.append(root[template].container);
    })

    root.container.addEventListener('change', () => {
        onAction()
    })
    root.container.addEventListener('reset', () => {
        setTImeout(onAction)
    })
    root.container.addEventListener('submit', (e) => {
        e.preventDefault()
        onAction(e.submitter)
    })
    
    const render = (data) => {
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate)
            Object.keys(item).forEach(key => {
                if (row.elements[key] && item[key] !== undefined) row.elements[key].textContent = item[key];
            })
            return row.container
        });
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}