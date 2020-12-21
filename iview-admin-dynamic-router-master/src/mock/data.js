import Mock from 'mockjs'
import {doCustomTimes} from '@/libs/util'
import orgData from './data/org-data'
import {treeData} from './data/tree-select'

const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}
///////////动态路由的数据
//后台可以返回id+pid的平面数据，然后js组合这么个数组
//这里就随便放了几个页面，为了功能测试
export const routersData = [{
  path: '/pet',
  name: 'Pet',
  meta: {
    title: '宠物',
    hideInMenu: false,
    icon: 'logo-freebsd-devil'
  },
  component: 'components/main',
  children: [{
    path: 'cat',
    name: 'Cat',
    meta: {
      title: '猫咪',
      hideInMenu: false,
      icon: 'ios-cloudy-night'
    },
    component: 'view/pet/cat/Cat.vue'
  }, {
    path: 'dog',
    name: 'Dog',
    meta: {
      hideInMenu: false,
      title: '狗娃',
      icon: 'ios-color-filter'
    },
    component: 'view/pet/dog/Dog.vue'
  }, {
    path: 'pig',
    name: 'Pig',
    meta: {
      hideInMenu: false,
      title: '猪啊',
      icon: 'ios-contact'
    },
    component: 'view/pet/pig/Pig.vue',
    children: [
      {
        path: 'female',
        name: 'Female',
        meta: {
          hideInMenu: false,
          title: '母猪',
          icon: 'ios-contact'
        },
        component: 'view/pet/pig/Pig.vue',
      },
      {
        path: 'male',
        name: 'Male',
        meta: {
          hideInMenu: false,
          title: '公猪',
          icon: 'ios-contact'
        },
        component: 'view/pet/pig/Pig.vue',
      }
    ]
  }]
}]
///////////动态路由的数据
/////用户具有的菜单权限名字的数组
export const MenuPerms = ['Pet', 'PetDog', 'PetCat', 'PetPig', 'PetPigFemale', 'PetPigMale'
  , 'components', 'tree_select_page','count_to_page','drag_list_page'
]
