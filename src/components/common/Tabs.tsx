// React
import React from 'react'

// Types
import { TabsProps, TabItem, TabItemProps } from '@interfaces'

const Tabs: React.FC<TabsProps> = ({ items }) => {
  const [activeTab, setTab] = React.useState<string>(items[0].label)

  // Evento 'click' en un TabItem para actualizar la actual tab activada
  const handleChangeTab = React.useCallback((label: string) => setTab(label), [])

  // Definir los elementos de cada Tab
  const TabItems = React.useCallback(() => {
    return (
      <ul className="tab-list mb-0">
        {items.map((item: TabItem) => (
          <Tab key={item.label} label={item.label} isActive={activeTab === item.label} onChange={handleChangeTab}>
            {item.value}
          </Tab>
        ))}
      </ul>
    )
  }, [activeTab])

  // Definir el contenido a mostrar dependiendo de la tab activada
  const tabContent: React.ReactNode = React.useMemo(() => {
    // Encontrar el contenido a renderizar dependiendo de la tab activa
    const currentContent = items.find((item: TabItem) => item.label === activeTab)

    return currentContent?.content
  }, [activeTab, items])

  return (
    <div className="tabs">
      {/* Elementos de Tab */}
      <TabItems />

      {/* Contenido dependiendo del elemento activo */}
      <div className="tab-content">{tabContent}</div>
    </div>
  )
}

export default React.memo(Tabs)

// <------------------------ Extra Components ------------------------>
export const Tab: React.FC<TabItemProps> = ({ children, label, isActive, onChange }) => {
  const tabClasses = `tab-item ${isActive ? 'active' : 'desactive'}`

  // Evento 'click' en tab
  const handleClick = React.useCallback(() => onChange(label), [])

  return (
    <li onClick={handleClick} className={tabClasses} aria-hidden="true">
      {children}
    </li>
  )
}
